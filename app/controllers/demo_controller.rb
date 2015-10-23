class DemoController < ApplicationController
  layout false 
  def index
  end

  def hello
  	@id = params['id']
  	@page = params[:page]
  	@con = params[:controller]
  end
  def test
  	 headers['Access-Control-Allow-Origin'] = "*"
  end
end
