class DemoController < ApplicationController
  layout 'application'
  def index
  end

  def hello
    render :layout => false
  	@id = params['id']
  	@page = params[:page]
  	@con = params[:controller]
  end
  def test
  	 headers['Access-Control-Allow-Origin'] = "*"
  end
  def mc
   render :layout => false
  end
   
   def pcms
    render :layout => false
   end
end
