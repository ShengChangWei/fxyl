import requestService from '@/services/request.service.js';
const indexApi = {
    getAllInfo() {
        return requestService.get('/mock/yzt.json');
    },
    getRiverInfo() {
        return requestService.get('/mock/river.json');
    },
    getRiverBuffer() {
        return requestService.get('/mock/mianRiverz.json');
    },
    getWaterStation() {
        return requestService.get('/mock/waterStation.json')
    }
};
export default indexApi;
