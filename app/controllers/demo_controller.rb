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
   
   def angular
      @projects = Sfuproject.all  
    #  @find = Sfuproject.find_by id: 3
   end

   def editsfuproject 

     # hash = {}
     # hash[:text, :author, :comment] = params[:text, :author, :comment]   
      @d = Sfuproject.new(params.permit(:text, :author, :comment))

    if @d.save 
    redirect_to demo_angular_path
    else
      render demo_angular_path
    end

   end

   def up
    @me = Sfuproject.find_by id: 2
      if @me.update_attributes(params.permit(:text, :author, :comment))
         render demo_angular_path
        else
      end  
   end

end
