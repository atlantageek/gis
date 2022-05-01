class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

    # POST /auth/login
    def login
      logger.debug(params)
      @user = User.find_by_email(params[:email])
      if @user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: @user.id,franchise_id: @user.franchise_id)
        time = Time.now + 2.minutes.to_i
        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                       username: @user.email, user_id: @user.id,franchise_id: @user.franchise_id }, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
  
    private
  
    def login_params
      params.permit(:email, :password)
    end
end
