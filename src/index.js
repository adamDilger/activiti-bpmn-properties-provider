import { SequenceFlowProps } from "./activiti/SequenceFlowProps";
import { ServiceTaskProps } from "./activiti/ServiceTaskProps";
import { UserTaskProps } from "./activiti/UserTaskProps";
import { is } from "./utils";

/**
 * @typedef {object} Group
 *
 * @prop {id}: string
 * @prop {label}: string
 * @prop {entries} any[]
 */

/**
 * @returns {Group | null}
 */
function ActivitiGroup(element, injector) {
  const translate = injector.get("translate");

  const entries = [];

  if (is(element, "bpmn:ServiceTask")) {
    entries.push(...ServiceTaskProps({ element }));
  }

  if (is(element, "bpmn:UserTask")) {
    entries.push(...UserTaskProps({ element }));
  }

  if (is(element, "bpmn:SequenceFlow")) {
    entries.push(...SequenceFlowProps({ element }));
  }

  if (entries.length === 0) {
    return null;
  }

  return {
    id: "activiti",
    label: translate("Activiti"),
    entries,
  };
}

/**
 * @returns {Group[]}
 */
function getGroups(element, injector) {
  const groups = [ActivitiGroup(element, injector)];
  return groups.filter((g) => g !== null);
}

class ActivitiPropertiesProvider {
  constructor(propertiesPanel, injector) {
    propertiesPanel.registerProvider(this);
    this._injector = injector;
  }

  getGroups(element) {
    return (groups) => {
      groups = groups.concat(getGroups(element, this._injector));
      return groups;
    };
  }
}

ActivitiPropertiesProvider.$inject = ["propertiesPanel", "injector"];

export default {
  __init__: ["activitiPropertiesProvider"],
  activitiPropertiesProvider: ["type", ActivitiPropertiesProvider],
};
