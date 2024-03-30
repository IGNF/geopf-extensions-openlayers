export default Styling;
declare namespace Styling {
    let APPLY_CONVERT_GEOM_GPX: boolean;
    namespace DEFAULT_ICON {
        let src: string;
        let anchor: number[];
        let scale: number;
    }
    namespace DEFAULT_CIRCLE {
        let radius: number;
        namespace fill {
            let opacity: number;
            let color: number[];
        }
        namespace stroke {
            export let width: number;
            let opacity_1: number;
            export { opacity_1 as opacity };
            let color_1: number[];
            export { color_1 as color };
        }
    }
    namespace DEFAULT_STROKE {
        let width_1: number;
        export { width_1 as width };
        let opacity_2: number;
        export { opacity_2 as opacity };
        let color_2: number[];
        export { color_2 as color };
    }
    namespace DEFAULT_FILL {
        let opacity_3: number;
        export { opacity_3 as opacity };
        let color_3: number[];
        export { color_3 as color };
    }
    namespace DEFAULT_TEXT {
        export let font: string;
        export let textAlign: string;
        export namespace stroke_1 {
            let color_4: number[];
            export { color_4 as color };
            let width_2: number;
            export { width_2 as width };
            export let opactity: number;
        }
        export { stroke_1 as stroke };
        export namespace fill_1 {
            let opacity_4: number;
            export { opacity_4 as opacity };
            let color_5: number[];
            export { color_5 as color };
        }
        export { fill_1 as fill };
    }
    function getListTags(): any[];
    function defineStyleFromProperties(feature: any): any;
    function defineStyleFunctionByDefault(defaultStyle: Object): Function;
    function definePropertiesFromStyleByType(feature: any): void;
    function definePropertiesFromStyle(feature: any): void;
    function defineTagFromStyle(style: any, format: string): string;
}
//# sourceMappingURL=Styling.d.ts.map