import * as React from 'react';
import classNames from 'classnames';

export default function TextareaFormControl(props) {
    const { name, label, hideLabel, isRequired, placeholder, width = 'full', hasError, isShaking, onFieldChange } = props;
    const fieldPath = props['data-sb-field-path'];
    const labelId = `${name}-label`;
    const attr: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {};
    if (label) {
        attr['aria-labelledby'] = labelId;
    }
    if (isRequired) {
        attr.required = true;
    }
    if (placeholder) {
        attr.placeholder = placeholder;
    }

    return (
        <div
            className={classNames('sb-form-control', 'w-full', {
                'sm:w-formField': width === '1/2',
                'form-field-error': isShaking
            })}
            data-sb-field-path={fieldPath}
        >
            {label && (
                <label
                    id={labelId}
                    className={classNames('sb-label', 'inline-block', 'sm:mb-1.5', { 'sr-only': hideLabel })}
                    htmlFor={name}
                    {...(fieldPath && { 'data-sb-field-path': '.label .name#@for' })}
                >
                    {label}
                </label>
            )}
            <textarea
                id={props.name}
                className={classNames(
                    'sb-textarea text-inherit bg-transparent border rounded-lg w-full p-3 focus:outline-none transition-colors duration-200',
                    hasError ? 'border-red-400' : 'border-current'
                )}
                name={name}
                rows={5}
                onChange={onFieldChange}
                {...attr}
                {...(fieldPath && { 'data-sb-field-path': '.name#@id .name#@name' })}
            />
            {hasError && (
                <p className="error-message">This field is required</p>
            )}
        </div>
    );
}
