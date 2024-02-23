class EmployeesController < ApplicationController
  def index
    query = params[:query]
    @employees = if query.present?
                   Employee.where('first_name ILIKE :query OR last_name ILIKE :query OR email ILIKE :query', query: "%#{query}%")
                 else
                   Employee.all
                 end
  end

  def new
    @employee = Employee.new
  end

  def show
    @employee = Employee.find_by(id: params[:id])
    redirect_to employees_path if @employee.nil?
  end

  def edit
    @employee = Employee.find_by(id: params[:id])
    redirect_to employees_path if @employee.nil?
  end

  def destroy
    @employee = Employee.find_by(id: params[:id])
    @employee.destroy if @employee.present?
    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.remove(@employee) }
      format.html { redirect_to employees_path }
    end
  end

  def update
    @employee = Employee.find_by(id: params[:id])
    redirect_to employees_path if @employee.nil?

    if @employee.update(employee_params)
      render turbo_stream: turbo_stream.replace(@employee)
    else
      redirect_to employees_path
    end
  end

  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      redirect_to @employee
    else
      raise @employee.errors.inspect
    end
  end
end

private

def employee_params
  params.require(:employee).permit(:first_name, :last_name, :email, :drivers_license, :phone, :birthday, :country, :active, :company_id)
end
