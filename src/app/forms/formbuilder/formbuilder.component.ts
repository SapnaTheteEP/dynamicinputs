import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss']
})
export class FormbuilderComponent {
  form: FormGroup;
  fields: any[] = [];
  submitted: boolean = false;

  selectfieldarr: any[] = [
    { Id: 1, name: "Text input" },
    { Id: 2, name: "Textarea" },
    { Id: 3, name: "Dropdown" },
    { Id: 4, name: "Checkbox" },
    { Id: 5, name: "Radio button" },
  ];

  selectedFieldType: string = '';
  fieldLabel = '';
  fieldPlaceholder = '';
  fieldRequired = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  onChanged(data: any) {
    this.selectedFieldType = data;
  }

  checkboxGroupValidator(group: FormGroup): ValidationErrors | null {
    const hasChecked = Object.values(group.controls).some((control: any) => control.value === true);
    return hasChecked ? null : { required: true };
  }

  addField() {
    const name = `field${this.fields.length}`;
    let control: any;

    const newField: any = {
      name,
      type: this.selectedFieldType,
      label: this.fieldLabel,
      placeholder: this.fieldPlaceholder,
      required: this.fieldRequired,
      options: []
    };

    if (['Dropdown', 'Checkbox', 'Radio button'].includes(this.selectedFieldType)) {
      newField.options = ['Option 1', 'Option 2',];
    }

    if (this.selectedFieldType === 'Checkbox') {
      const checkboxGroup: any = {};
      newField.options.forEach((_: any, i: number) => {
        checkboxGroup[`option${i}`] = new FormControl(false);
      });

      control = this.fb.group(checkboxGroup, this.fieldRequired ? { validators: this.checkboxGroupValidator } : {});
    } else {
      control = this.fb.control('', this.fieldRequired ? Validators.required : null);
    }

    this.fields.push(newField);
    this.form.addControl(name, control);

    this.fieldLabel = '';
    this.fieldPlaceholder = '';
    this.fieldRequired = false;
    this.selectedFieldType = '';
  }

  isCheckboxGroupInvalid(fieldName: string): boolean {
    const group = this.form.get(fieldName) as FormGroup;
    return group && group.invalid && this.submitted;
  }

  onSubmit() {
    this.submitted = true;

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
      }
      control?.markAsTouched();
    });

    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      alert('Form Submitted Successfully!');
      console.log()
    } else {
      alert('Please fill in all required fields!');
    }
  }
}
