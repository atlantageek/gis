class GeolayersController < ApplicationController
    def index
        @franchise=self.get_franchise()
        @geolayers = @franchise.geolayers.all 
        render json: @geolayers
    end 

    def show
        @geolayer = Geolayer.find(params[:id])
        render json: @geolayer
    end 

    def create
        logger.debug("CREATE!")
        #@franchise=Franchise.find(params[:franchise_id])
        @geolayer = @franchise.geolayers.new(
            name: params[:name],
            enabled: true,
            layer_type: params[:layer_type],
            source: params[:source],
            uri: params[:uri],
            filter: params[:filter]
 
        )
        if @geolayer.save
            render json: @geolayer, status: :created
          else
            render json: { errors: @geolayer.errors.full_messages },
                   status: :unprocessable_entity
          end
    
    end 

    def update
        @geolayer = Geolayer.find(params[:id])
        logger.error(@geolayer)
        @geolayer.update(
            name: params[:name],
            enabled: params[:enabled],
            layer_type: params[:layer_type],
            source: params[:source],
            uri: params[:uri],
            filter: params[:filter]
        )
        render json: @geolayer
    end 

    def destroy
        @geolayer = Geolayer.all 
        @geolayer = Geolayer.find(params[:id])
        @geolayer.destroy
        render json: @geolayer
    end 
end
