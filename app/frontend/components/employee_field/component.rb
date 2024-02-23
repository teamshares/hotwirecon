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
    @nowrap = nowrap
    @highlight = highlight
    super
  end
end
