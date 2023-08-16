import { TextFieldEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { getBusinessObject, is } from "../utils";
import { useService } from "bpmn-js-properties-panel";
import { SkipExpression } from "./SharedProps";

export function SequenceFlowProps(props) {
  const { element } = props;

  if (!is(element, "bpmn:SequenceFlow")) {
    return [];
  }

  const entries = [
    SkipExpression,
    {
      id: "conditionExpression",
      component: ConditionExpression,
      isEdited: isTextFieldEntryEdited,
    },
  ];

  return entries;
}

function ConditionExpression(props) {
  const { element } = props;

  const commandStack = useService("commandStack"),
    bpmnFactory = useService("bpmnFactory"),
    translate = useService("translate"),
    debounce = useService("debounceInput");

  const getValue = () => {
    const ce = getConditionExpression(element);
    if (ce) return ce.get("body");

    return null;
  };

  const setValue = (value) => {
    if (value) {
      const conditionExpression = createFormalExpression(element, { body: value }, bpmnFactory);
      updateCondition(element, commandStack, conditionExpression);
    } else {
      updateCondition(element, commandStack);
    }
  };

  return TextFieldEntry({
    element,
    id: "conditionExpression",
    label: translate("Condition"),
    getValue,
    setValue,
    debounce,
  });
}

/**
 * getConditionExpression - get the body value of a condition expression for a given element
 *
 * @param  {ModdleElement} element
 *
 * @return {string|undefined}
 */
function getConditionExpression(element) {
  const businessObject = getBusinessObject(element);

  if (!is(businessObject, "bpmn:SequenceFlow")) {
    return null;
  }

  return businessObject.get("conditionExpression");
}

function updateCondition(element, commandStack, condition = undefined) {
  if (!is(element, "bpmn:SequenceFlow")) {
    return;
  }

  commandStack.execute("element.updateProperties", {
    element,
    properties: {
      conditionExpression: condition,
    },
  });
}

function createFormalExpression(parent, attributes, bpmnFactory) {
  const element = bpmnFactory.create("bpmn:FormalExpression", attributes);
  const mappedParent = is(parent, "bpmn:SequenceFlow") ? getBusinessObject(parent) : parent;
  element.$parent = mappedParent;
  return element;
}
