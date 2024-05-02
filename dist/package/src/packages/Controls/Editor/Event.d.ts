export default EventEditor;
declare namespace EventEditor {
    let onloaded: string;
    namespace layer {
        let onclickvisibility: string;
        let onclickclone: string;
        let onclickremove: string;
    }
    namespace legend {
        let onclickedition: string;
        let onchangevalue: string;
    }
    namespace group {
        let oncollapse: string;
    }
    namespace style {
        let oneditjson: string;
        namespace scale {
            let onchangemin: string;
            let onchangemax: string;
        }
    }
    namespace filter {
        let oneditjson_1: string;
        export { oneditjson_1 as oneditjson };
    }
    namespace themes {
        let onclickimage: string;
        let onclicktitle: string;
    }
    namespace search {
        let onsubmit: string;
        let onautocomplete: string;
    }
}
//# sourceMappingURL=Event.d.ts.map