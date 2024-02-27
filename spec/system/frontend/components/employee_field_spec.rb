# frozen_string_literal: true

require "rails_helper"

describe "employee_field component preview" do
  subject { page }

  before { visit("/rails/view_components/employee_field/default") }

  it "default preview" do
    # TODO: modify this test as needed to confirm preview actually renders
    is_expected.to have_text "EmployeeField::Component"
  end
end
