class DemoController < ApplicationController
  layout 'application'

  def index
   render :layout => false
  end

  def hello
    render :layout => false
  	@id = params['id']
  	@page = params[:page]
  	@con = params[:controller]
  end
  def test
    render :layout => false
  	 headers['Access-Control-Allow-Origin'] = "*"
  end
  def mc
   render :layout => false
  end
   
   def pcms
    render :layout => false
   end

    def pcm_content
    render :layout => false
   end

    def webgl
    render :layout => false
   end
   
   def editsfuproject   

     # hash = {}
     # hash[:text, :author, :comment] = params[:text, :author, :comment]   
      @d = Sfuproject.new(params.permit(:text, :author, :comment))

    if @d.save 
    
    else
    end

   end

end
