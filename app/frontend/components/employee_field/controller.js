import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "display", "edit", "form", "input", "valueDisplay" ];
  static values = { initial: String }

  showForm() {
    this.editTarget.classList.remove("opacity-0");
  }

  hideForm() {
    this.editTarget.classList.add("opacity-0");
  }

  onFormEnter(event) {
    /* Submit will be handled by focusOut event. Capture here to prevent it from submitting twice on enter key. */
    event.preventDefault();
    this.inputTarget.blur();
  }
  
  onFormEsc(event) {
    /* Reset value */
    this.inputTarget.value = this.initialValue;
    this.inputTarget.blur();
  }

  setValueDisplay(newValue) {
    // Replace the visible content while we await the stream response
    const el = this.inputTarget;
    if (el instanceof HTMLSelectElement) {
      this.valueDisplayTarget.textContent = el.options[el.selectedIndex].text
    } else {
      this.valueDisplayTarget.textContent = newValue;
    }
  }

  onInputChange(event) {
    if (this.inputTarget.getAttribute('type') === 'checkbox') {
      // No need to check for changes, since merely clicking the checkbox means changing it
      this.formTarget.requestSubmit();
    } else {
      this.hideForm();
      if (this.inputTarget.value !== this.initialValue) {
        // console.log(`New value: ${this.inputTarget.value}; Initial value: ${this.initialValue}`);
        this.setValueDisplay(this.inputTarget.value);
        this.formTarget.requestSubmit();
      }
    }
  }
}