import { TextFieldEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { useService } from "bpmn-js-properties-panel";
import { SkipExpression } from "./SharedProps";

export function UserTaskProps(_props) {
  const entries = [
    {
      id: "assignee",
      component: AssigneeComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "candidateUsers",
      component: CandidateUsersComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "candidateGroups",
      component: CandidateGroupsComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "formKey",
      component: FormKeyComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "dueDate",
      component: DueDateComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "priority",
      component: PriorityComponent,
      isEdited: isTextFieldEntryEdited,
    },
    {
      id: "category",
      component: CategoryComponent,
      isEdited: isTextFieldEntryEdited,
    },
    SkipExpression,
  ];

  return entries;
}

function AssigneeComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.assignee;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      assignee: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "assignee",
    label: translate("Assignee"),
    getValue,
    setValue,
    debounce,
  });
}

function CandidateUsersComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.candidateUsers;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      candidateUsers: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "candidateUsers",
    label: translate("Candidate Users (comma separated)"),
    getValue,
    setValue,
    debounce,
  });
}

function CandidateGroupsComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.candidateGroups;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      candidateGroups: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "candidateGroups",
    label: translate("Candidate Groups (comma separated)"),
    getValue,
    setValue,
    debounce,
  });
}

function FormKeyComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.formKey;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      formKey: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "formKey",
    label: translate("Form Key"),
    getValue,
    setValue,
    debounce,
  });
}

function DueDateComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.dueDate;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      dueDate: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "dueDate",
    label: translate("Due Date (variable)"),
    getValue,
    setValue,
    debounce,
  });
}

function PriorityComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.priority;
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      priority: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "priority",
    label: translate("Priority"),
    getValue,
    setValue,
    debounce,
  });
}

function CategoryComponent(props) {
  const { element } = props;

  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const modeling = useService("modeling");

  const getValue = () => element.businessObject.get("category");
  const setValue = (value) => {
    return modeling.updateProperties(element, {
      category: value,
    });
  };

  return TextFieldEntry({
    element,
    id: "category",
    label: translate("Category"),
    getValue,
    setValue,
    debounce,
  });
}
