export default {
    editor: {
        label: 'Shadcn Checkbox',
        icon: 'check-square',
    },
    triggerEvents: [
        { name: 'click', label: 'On Click', event: { value: '' }, default: true },
        { name: 'change', label: 'On Change', event: { value: '' } },
    ],
    properties: {
        content: {
            label: 'Checkbox Settings',
            type: 'Object',
            section: 'settings',
            bindable: true,
            defaultValue: {
                checked: false,
                label: '',
                disabled: false,
                size: 'default',
                customClasses: ''
            },
            options: {
                item: {
                    checked: {
                        label: 'Checked',
                        type: 'OnOff',
                        section: 'settings',
                        bindable: true,
                        defaultValue: false
                    },
                    label: {
                        label: 'Label',
                        type: 'Text',
                        section: 'settings',
                        bindable: true,
                        defaultValue: ''
                    },
                    disabled: {
                        label: 'Disabled',
                        type: 'OnOff',
                        section: 'settings',
                        defaultValue: false
                    },
                    size: {
                        label: 'Size',
                        type: 'TextSelect',
                        section: 'settings',
                        options: {
                            choices: [
                                { value: 'sm', label: 'Small' },
                                { value: 'default', label: 'Default' },
                                { value: 'lg', label: 'Large' }
                            ]
                        },
                        defaultValue: 'default'
                    },
                    customClasses: {
                        label: 'Custom Classes',
                        type: 'Text',
                        section: 'style',
                        bindable: true,
                        defaultValue: ''
                    }
                }
            }
        }
    }
};
