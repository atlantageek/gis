class ApplicationController < ActionController::API
  before_action :authorize_request
  def not_found
    render json: { error: 'not_found' }
  end
  def get_franchise

    return @franchise
  end
    
  def authorize_request

    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      logger.debug(@decoded)
      @current_user = User.find(@decoded[:user_id])
      
      @franchise = Franchise.find(@decoded[:franchise_id])
      logger.error(@franchise)
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
