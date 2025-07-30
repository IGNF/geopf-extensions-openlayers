export default SearchEngineUtils;
declare namespace SearchEngineUtils {
    namespace advancedSearchFiltersByDefault {
        let PositionOfInterest: ({
            name: string;
            title: string;
            value?: undefined;
        } | {
            name: string;
            title: string;
            value: string[];
        })[];
        let StreetAddress: {
            name: string;
            title: string;
        }[];
        let CadastralParcel: {
            name: string;
            title: string;
            description: string;
        }[];
    }
    function zoomToResultsByDefault(info: any): Integer;
}
//# sourceMappingURL=SearchEngineUtils.d.ts.map