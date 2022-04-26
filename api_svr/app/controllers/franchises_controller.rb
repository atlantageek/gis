class FranchisesController < ApplicationController
    def index
        @franchises = Franchise.all 
        render json: @franchises
    end 

    def show
        @franchise = Franchise.find(params[:id])
        render json: @franchise
    end 

    def create
        @franchise = Franchise.create(
            name: params[:name],
            full_name: params[:full_name],
            contact_email: params[:contact_email]
        )
        render json: @franchise
    end 

    def update
        @franchise = Franchise.find(params[:id])
        @franchise.update(
            name: params[:name],
            full_name: params[:full_name],
            contact_email: params[:contact_email]
        )
        render json: @franchise
    end 

    def destroy
        @franchise = Franchise.all 
        @franchise = Franchise.find(params[:id])
        @franchise.destroy
        render json: @franchise
    end 
end
