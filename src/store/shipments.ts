import { Shipment } from '@/models/Shipment';
import { ActionContext } from 'vuex';
import { State } from './index';

export interface ShipmentState {
    allShipments: Array<Shipment>;
    activeShipment: Shipment;
    activeShipmentLoading: boolean;
}

const state: ShipmentState = {
    allShipments: [],
    activeShipment: { stage: '', pilot: '', status: '', progress: 0 },
    activeShipmentLoading: false,
};

const mutations = {
    ANIMATE_ALL_SHIPMENTS: (state: ShipmentState): void => {
        let y_counter = 0;
        let x_counter = 0;
        let y = true;
        let x = true;
        setInterval(() => {
            state.allShipments = state.allShipments.map((shipment, index) => {
                if (shipment.coordinates) {
                    switch (index % 4) {
                        case 0:
                            shipment.coordinates = {
                                lat: !y ? shipment.coordinates.lat + 0.5 : shipment.coordinates.lat - 0.5,
                                lng: x ? shipment.coordinates.lng + 0.5 : shipment.coordinates.lng - 0.5,
                            };
                            break;

                        case 1:
                            shipment.coordinates = {
                                lat: y ? shipment.coordinates.lat + 0.5 : shipment.coordinates.lat - 0.5,
                                lng: !x ? shipment.coordinates.lng + 0.5 : shipment.coordinates.lng - 0.5,
                            };
                            break;

                        case 2:
                            shipment.coordinates = {
                                lat: y ? shipment.coordinates.lat + 0.5 : shipment.coordinates.lat - 0.5,
                                lng: x ? shipment.coordinates.lng + 0.5 : shipment.coordinates.lng - 0.5,
                            };
                            break;

                        case 3:
                            shipment.coordinates = {
                                lat: !y ? shipment.coordinates.lat + 0.5 : shipment.coordinates.lat - 0.5,
                                lng: !x ? shipment.coordinates.lng + 0.5 : shipment.coordinates.lng - 0.5,
                            };
                            break;
                    }
                }
                return shipment;
            });

            y_counter = y ? y_counter + 1 : y_counter - 1;
            if (y_counter == 20) y = false;
            if (y_counter == -20) y = true;

            x_counter = x ? x_counter + 1 : x_counter - 1;
            if (x_counter == 30) x = false;
            if (x_counter == -30) x = true;

            // console.log({ x_counter, y_counter, x, y });
        }, 3000);
    },
    SET_ALL_SHIPMENTS: (state: ShipmentState, data: Shipment[]): void => {
        state.allShipments = data;
    },
    SET_ACTIVE_SHIPMENT: (state: ShipmentState, data: Shipment): void => {
        state.activeShipment = data;
    },
    SET_ACTIVE_SHIPMENT_LOADING: (state: ShipmentState, data: boolean): void => {
        state.activeShipmentLoading = data;
    },
};

const actions = {
    async fetchAllShipments(ctx: ActionContext<ShipmentState, State>): Promise<void> {
        const shipments = await fetch('api/shipments.json').then(res => res.json());
        ctx.commit('SET_ALL_SHIPMENTS', shipments);
        setTimeout(() => {
            ctx.commit('ANIMATE_ALL_SHIPMENTS');
        }, 3000);
    },
    async setActiveShipment(ctx: ActionContext<ShipmentState, State>, data: Shipment): Promise<void> {
        ctx.commit('SET_ACTIVE_SHIPMENT_LOADING', true);
        setTimeout(() => {
            ctx.commit('SET_ACTIVE_SHIPMENT', data);
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
