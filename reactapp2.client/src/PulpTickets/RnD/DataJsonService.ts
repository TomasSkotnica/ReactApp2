//export const async: any GetReleases = (): any => {
//    console.log("DataJsonService.GetReleases()");
//    fetch('api/PSRItems/releases', {
//        method: 'GET',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//    })
//        .then((response) => {
//            if (!response.ok) { throw new Error(`HTTP error: ${response.status}`); }
//            return response.json();
//        })
//        .then((result) => {
//            console.log(result);
//            result.splice(0, 0, "-select-");
//            return result;
//        });
//};

export class DataJsonService {
    public async GetReleases(): Promise<Response> {
        console.log("DataJsonService.GetReleases()");
        return fetch('https://localhost:7208/api/PSRItems/releases', 
            { method: 'GET', mode: 'no-cors', headers: { 'Content-Type': 'application/json', }, });        
    }
}