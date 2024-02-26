# frozen_string_literal: true

# View Component for individual field of an Employee
class EmployeeField::Component < ApplicationComponent
  enable_wrapper
  # NOTE: if you intend to use #with_collection, with_collection_parameter must be explicitly set
  # with_collection_parameter :employee_field

  def initialize(employee:, key:, nowrap: false, highlight: false)
    @employee = employee
    @key = key
    @value = employee[key]
    @display_value = display_value(employee, key)
    @nowrap = nowrap
    @highlight = highlight
    @companies = Company.all
    super
  end

  private

  def display_value(employee, key)
    if key == :company_id
      return employee.company.name
    end

    employee[key]
  end
end
