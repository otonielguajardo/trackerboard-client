import { State } from './index';
import { ActionContext } from 'vuex';
import { asyncForEach, rnd } from '@/utils';

import { Shipment } from '@/models/Shipment';
import { Stage } from '@/models/Stage';
import { Pilot } from '@/models/Pilot';

import _ from 'lodash';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const refreshRate = 2000;

export interface ShipmentState {
    queryText: string;
    allShipments: Array<Shipment>;
    allShipmentsInterval: any;
    allStages: Array<Stage>;
    activeShipmentId: string | null;
    activeShipmentLoading: boolean;
}

const state: ShipmentState = {
    queryText: '',
    allShipments: [],
    allShipmentsInterval: null,
    allStages: [],
    activeShipmentId: null,
    activeShipmentLoading: false,
};

export const generateRandomShipment = (pilot: Pilot): Shipment => {
    const progress = rnd(0, 100);
    const coordinates = { lat: rnd(50, 80), lng: rnd(50, 150) };
    return {
        id: uuidv4(),
        pilot,
        progress,
        coordinates,
        stage: '',
        status: '',
        stageSince: moment().format(),
    };
};

const mutations = {
    SET_ALL_STAGES: (state: ShipmentState, data: Stage[]): void => {
        state.allStages = data;
    },
    LOOP_ALL_SHIPMENTS: (state: ShipmentState, { allPilots, allStages }: any): void => {
        //
        clearInterval(state.allShipmentsInterval);

        const allShipments = allPilots.map((pilot: Pilot): Shipment => generateRandomShipment(pilot));
        let y_counter = 0;
        let x_counter = 0;
        let y = true;
        let x = true;

        state.allShipmentsInterval = setInterval(async () => {
            state.allShipments = await Promise.all(
                allShipments.map(async (shipment: Shipment, index: number) => {
                    // move around
                    const mvmntMod = 0.05;
                    if (shipment.coordinates) {
                        switch (index % 4) {
                            case 0:
                                shipment.coordinates = {
                                    lat: !y ? shipment.coordinates.lat + mvmntMod : shipment.coordinates.lat - 0.5,
                                    lng: x ? shipment.coordinates.lng + mvmntMod : shipment.coordinates.lng - mvmntMod,
                                };
                                break;

                            case 1:
                                shipment.coordinates = {
                                    lat: y ? shipment.coordinates.lat + mvmntMod : shipment.coordinates.lat - mvmntMod,
                                    lng: !x ? shipment.coordinates.lng + mvmntMod : shipment.coordinates.lng - mvmntMod,
                                };
                                break;

                            case 2:
                                shipment.coordinates = {
                                    lat: y ? shipment.coordinates.lat + mvmntMod : shipment.coordinates.lat - mvmntMod,
                                    lng: x ? shipment.coordinates.lng + mvmntMod : shipment.coordinates.lng - mvmntMod,
                                };
                                break;

                            case 3:
                                shipment.coordinates = {
                                    lat: !y ? shipment.coordinates.lat + mvmntMod : shipment.coordinates.lat - mvmntMod,
                                    lng: !x ? shipment.coordinates.lng + mvmntMod : shipment.coordinates.lng - mvmntMod,
                                };
                                break;
                        }
                    }

                    // set new progress
                    const newProgress = shipment.progress + rnd(0.01, 0.03);
                    // const newProgress = shipment.progress + 1;
                    shipment.progress = newProgress > 100 ? 0 : newProgress;

                    // set stage
                    const lastStage = shipment.stage;
                    await asyncForEach(_.sortBy(allStages, 'sort'), (stage: Stage, index: number) => {
                        if (shipment.progress >= (100 / allStages.length) * index) {
                            shipment.stage = stage.name;
                            shipment.stageSort = stage.sort;
                        }
                    });
                    if (lastStage != shipment.stage) {
                        shipment.stageSince = moment().format();
                    }

                    return shipment;
                })
            );

            y_counter = y ? y_counter + 1 : y_counter - 1;
            if (y_counter == 20) y = false;
            if (y_counter == -20) y = true;

            x_counter = x ? x_counter + 1 : x_counter - 1;
            if (x_counter == 30) x = false;
            if (x_counter == -30) x = true;
        }, refreshRate);
    },
    SET_ACTIVE_SHIPMENT: (state: ShipmentState, id: string | null): void => {
        state.activeShipmentId = id;
    },
    SET_ACTIVE_SHIPMENT_LOADING: (state: ShipmentState, data: boolean): void => {
        state.activeShipmentLoading = data;
    },
};

const actions = {
    async fetchAllShipments(ctx: ActionContext<ShipmentState, State>): Promise<void> {
        //
        const allStages = await fetch('api/stages.json').then(res => res.json());
        const allPilots = await fetch('api/pilots.json').then(res => res.json());
        ctx.commit('LOOP_ALL_SHIPMENTS', { allStages, allPilots });
    },
    async setActiveShipmentId(ctx: ActionContext<ShipmentState, State>, id: string | null): Promise<void> {
        ctx.commit('SET_ACTIVE_SHIPMENT_LOADING', true);
        setTimeout(() => {
            ctx.commit('SET_ACTIVE_SHIPMENT', id);
            ctx.commit('SET_ACTIVE_SHIPMENT_LOADING', false);
        }, 300);
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
