import { Field, ErrorMessage } from 'formik'
import cx from 'classnames'

type FormItemProps = {
  label?: string
  maxLength?: number
  fieldName: string
  required?: boolean
  labelClassName?: string
  inputClassName?: string
  onChange?: () => void
  typeInput?: string
  placeholder?: string
  type?: string
}

export const TYPE_INPUT = {
  SELECT: 'SELECT',
  RADIO: 'RADIO',
  CHECKBOX: 'CHECKBOX',
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  TEXT_AREA: 'TEXT_AREA',
  PHONE: 'PHONE',
  COUNT: 'COUNT'
}

function FormItem(props: FormItemProps) {
  const {
    label,
    maxLength,
    fieldName,
    labelClassName,
    inputClassName,
    required,
    onChange,
    typeInput = TYPE_INPUT.TEXT,
    placeholder,
    type
  } = props

  const renderTextInput = ({ field, form }: any) => {
    const { name } = field
    const { setFieldValue } = form

    const onInputChange = (e: any) => {
      const { value } = e.target
      setFieldValue(name, value)
      onChange && onChange()
    }

    return (
      <Field
        name={fieldName}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type}
        className={cx('input block w-full', inputClassName)}
        onChange={(e: any) => onInputChange(e)}
      />
    )
  }

  const renderTextAreaInput = ({ field, form }: any) => {
    const { name } = field
    const { setFieldValue } = form

    const onTextAreaChange = (e: any) => {
      const { value } = e.target
      setFieldValue(name, value)
      onChange && onChange()
    }

    return (
      <Field
        as='textarea'
        name={fieldName}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cx('input block w-full', inputClassName)}
        onChange={(e: any) => onTextAreaChange(e)}
      />
    )
  }

  const FORM_ITEM_BY_TYPE = {
    [TYPE_INPUT.TEXT]: renderTextInput,
    [TYPE_INPUT.TEXT_AREA]: renderTextAreaInput
    // [TYPE_INPUT.SELECT]: renderSelectInput,
    // [TYPE_INPUT.RADIO]: renderRadioInput,
    // [TYPE_INPUT.CHECKBOX]: renderCheckBoxInput,
    // [TYPE_INPUT.NUMBER]: renderNumberInput,
    // [TYPE_INPUT.PHONE]: renderNumberPhone,
    // [TYPE_INPUT.COUNT]: renderCountInput
  }

  return (
    <div className='form-item'>
      <label
        className={cx('inline-block text-base mb-1', labelClassName, {
          required: required
        })}
      >
        {label}
      </label>
      <Field
        name={fieldName}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cx('input block w-full', inputClassName)}
      >
        {typeInput && FORM_ITEM_BY_TYPE[typeInput]}
      </Field>
      <ErrorMessage name={fieldName} component='div' className='errors-msg' />
    </div>
  )
}

export default FormItem
