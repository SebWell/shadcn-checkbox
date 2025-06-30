export default {
  editor: {
    label: {
      en: "shadcn Checkbox",
      fr: "Case à cocher shadcn"
    },
    icon: 'fas fa-check-square',
    bubble: {
      icon: 'fas fa-check-square'
    },
    deprecated: false
  },
  properties: {
    checked: {
      label: {
        en: "Checked",
        fr: "Coché"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "data"
    },
    indeterminate: {
      label: {
        en: "Indeterminate state",
        fr: "État indéterminé"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "data"
    },
    disabled: {
      label: {
        en: "Disabled",
        fr: "Désactivé"
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
      section: "behavior"
    },
    required: {
      label: {
        en: "Required",
        fr: "Requis"
      },
      type: "OnOff",
      defaultValue: false,
      section: "validation"
    },
    label: {
      label: {
        en: "Label",
        fr: "Libellé"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      translatable: true,
      section: "content"
    },
    value: {
      label: {
        en: "Value",
        fr: "Valeur"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      section: "data"
    },
    name: {
      label: {
        en: "Name",
        fr: "Nom"
      },
      type: "Text",
      defaultValue: "",
      section: "form"
    },
    wewebVariable: {
      label: {
        en: "Weweb variable",
        fr: "Variable Weweb"
      },
      type: "Variable",
      bindable: true,
      section: "data"
    },
    changeWorkflowId: {
      label: {
        en: "Change workflow",
        fr: "Workflow de changement"
      },
      type: "WorkflowId",
      bindable: true,
      section: "behavior"
    },
    customClasses: {
      label: {
        en: "Custom CSS classes",
        fr: "Classes CSS personnalisées"
      },
      type: "Text",
      bindable: true,
      section: "style"
    }
  },
  events: {
    change: {
      label: {
        en: "On change",
        fr: "Lors du changement"
      },
      default: null
    }
  },
  sections: {
    content: {
      label: { en: "Content", fr: "Contenu" },
      expand: true
    },
    data: {
      label: { en: "Data", fr: "Données" },
      expand: true
    },
    validation: {
      label: { en: "Validation", fr: "Validation" },
      expand: false
    },
    behavior: {
      label: { en: "Behavior", fr: "Comportement" },
      expand: false
    },
    form: {
      label: { en: "Form", fr: "Formulaire" },
      expand: false
    },
    style: {
      label: { en: "Style", fr: "Style" },
      expand: false
    }
  }
}; 