class EmployeesController < ApplicationController
  def index
    query = params[:query]
    @employees = if query.present?
                   Employee.where('first_name ILIKE :query OR last_name ILIKE :query OR email ILIKE :query', query: "%#{query}%")
                 else
                   Employee.all
                 end
  end

  def show
    @employee = Employee.find(params[:id])
  end
end
