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

  def edit
    @employee = Employee.find(params[:id])
  end

  def update
    @employee = Employee.find(params[:id])

    if @employee.update(employee_params)
      redirect_to @employee
    else
      render :edit
    end
  end
end

private 

def employee_params
  params.require(:employee).permit(:first_name, :last_name, :email, :drivers_license)
end
