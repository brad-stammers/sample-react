class Api::V1::FruitsController < ApplicationController
  before_action :set_fruit, only: %i[ show edit update destroy ]

  # GET /fruits or /fruits.json
  def index
    @fruits = Fruit.all
    render json: @fruits
  end

  # GET /fruits/1 or /fruits/1.json
  def show
  end

  # GET /fruits/new
  def new
    @fruit = Fruit.new
  end

  # GET /fruits/1/edit
  def edit
  end

  # POST /fruits or /fruits.json
  def create
    @fruit = Fruit.new(fruit_params)
    # render json: @fruits
    respond_to do |format|
      if @fruit.save
        # format.html { redirect_to @fruit, notice: "Fruit was successfully created." }
        # format.json { render :show, status: :created, location: @fruits }
        format.json { render json: @fruits }
      else
        # format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @fruit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fruits/1 or /fruits/1.json
  def update
    respond_to do |format|
      if @fruit.update(fruit_params)
        format.json { render @fruits }
      else
        format.json { render json: @fruit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fruits/1 or /fruits/1.json
  def destroy
    @fruit.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fruit
      @fruit = Fruit.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def fruit_params
      params.require(:fruit).permit(:id, :name, :desc)
    end
end
