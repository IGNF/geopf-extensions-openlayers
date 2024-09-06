# installer un widget dans le processus de build

* Ajouter les CSS pour les themes

`build/webpack/extend.themes.webpack.js`

```json
{
    "Classic" : [
        path.join(rootdir, "src", "packages", "CSS", "Controls/Widget", "GPFwidgetStyle.css")
    ],
    "Dsfr" : [
        path.join(rootdir, "src", "packages", "CSS", "Controls/Widget", "DSFRwidgetStyle.css")
    ]
}
```

* Ajouter le JS du widget

`build/webpack/modules.webpack.config.js`

```json
entry : {
    // Widgets
    "GpfExtOlWidget" : path.join(rootdir, "src", "packages", "Controls/Widget", "Widget.js"),
}
```

* Ajouter l'entrée dans le bundle

`src/packages/bundle.js`

```js
import Widget from "./Controls/Widget/Widget";
Ol.control.Widget = Widget;
```

* Ajouter l'entrée dans l'index

`src/index.js`

```js
export { default as Widget } from "./packages/Controls/Widget/Widget";
```

* Creer un exemple (classique et/ou dsfr)

`samples-src/pages/tests/Widget/`

* Ajouter le widget les exemples par defauts

`samples-src/pages/tests/Default/`

```js
var widget = new ol.control.Widget({
    position : "top-left"
});
map.addControl(widget);
```

pour les modules :

```html
<link rel="stylesheet" href="{{ baseurl }}/dist/modules/GpfExtOlWidget.css" />
<script src="{{ baseurl }}/dist/modules/GpfExtOlWidget.js"></script>
```

* Ajouter le widget dans les demos par framework

* Ajouter la classe metier et le DOM du widget

`src/packages/Controls`
> On peut partir des templates !
> Mais, il faut renommer `Widget` (fichier + contenu)

* Ajouter la CSS du widget

`src/packages/CSS/Controls`
> On peut partir des templates !
> Mais, il faut renommer `WidgetDOM` (fichier + contenu)


