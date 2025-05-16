export default LayerConfigUtils;
declare namespace LayerConfigUtils {
    function getLayerConfig(config: any): {
        params: {
            url: any;
            styles: any;
            version: any;
            format: any;
            projection: any;
            minScale: any;
            maxScale: any;
            extent: any;
            legends: any;
            title: any;
            description: any;
            metadata: any;
            tileMatrixSetLimits: any;
            TMSLink: any;
            matrixIds: string[];
            tileMatrices: any;
            nativeResolutions: any;
        };
    };
    function getTMSConfig(id: any): any;
}
//# sourceMappingURL=LayerConfigUtils.d.ts.map