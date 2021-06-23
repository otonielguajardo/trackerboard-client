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
    SET_ALL_SHIPMENTS: (state: ShipmentState): void => {
        state.allShipments = [
            { stage: 'Quotation', pilot: 'Watto', status: 'red', progress: 0 },
            { stage: 'Quotation', pilot: 'Chewie', status: 'orange', progress: 0 },
            { stage: 'Quotation', pilot: 'R2-D2', status: 'red', progress: 0 },
            { stage: 'Position', pilot: 'Luke', status: 'green', progress: 27, img: 'luke.png' },
            { stage: 'Position', pilot: 'Greedo', status: 'orange', progress: 20, img: 'greedo.png' },
            { stage: 'Position', pilot: 'Anakin', status: 'green', progress: 17 },
            { stage: 'Load', pilot: 'Han', status: 'red', progress: 34 },
            { stage: 'Load', pilot: 'Leia', status: 'orange', progress: 38 },
            { stage: 'Load', pilot: 'Darth Vader', status: 'green', progress: 42 },
            { stage: 'Load', pilot: 'Obi Wan', status: 'red', progress: 54 },
            { stage: 'Transit', pilot: 'Darth Maul', status: 'red', progress: 67 },
            { stage: 'Transit', pilot: 'Zebulba', status: 'green', progress: 70 },
            { stage: 'Download', pilot: 'C-3PO', status: 'orange', progress: 82 },
            { stage: 'Download', pilot: 'Padme', status: 'orange', progress: 69 },
            { stage: 'Download', pilot: 'Jabba', status: 'green', progress: 98 },
            { stage: 'Download', pilot: 'Boba Fett', status: 'red', progress: 100 },
            { stage: 'Download', pilot: 'Panaka', status: 'orange', progress: 100 },
        ];
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
        ctx.commit('SET_ALL_SHIPMENTS');
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
