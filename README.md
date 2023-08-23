# activiti-bpmn-properties-provider

Allows editing `activiti:` variables in `.bpmn` files via the [bpmn-js-properties-provider](https://www.npmjs.com/package/bpmn-js-properties-panel).


## Usage

Install required dependencies
```sh
# bpmn-js + properties panel
npm i bpmn-js bpmn-js-properties-panel

# Activiti moddle + panel provider
npm i activiti-bpmn-moddle activiti-bpmn-properties-provider
```


```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';

// external dependency
import activitiExtensionModule from 'activiti-bpmn-moddle/lib';
import activitiModdle from "activiti-bpmn-moddle/resources/activiti";

import ActivitiPropertiesProvider from 'activiti-bpmn-properties-provider';

// *.css imports

const modeler = new BpmnModeler({
    container: '#canvas',
    propertiesPanel: {
        parent: '#properties'
    },
    additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        activitiExtensionModule,
        ActivitiPropertiesProvider,
    ],
    moddleExtensions: {
        activiti: activitiModdle
    }
});
```
