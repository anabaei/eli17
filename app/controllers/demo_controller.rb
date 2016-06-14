class DemoController < ApplicationController
 layout "menu"

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
    

     @projects = Sfuproject.order(created_at: :desc).limit(5)
     @me = Sfuproject.find_by id: 2
     @me2 = Sfuproject.find_by id: 3
     render :layout => 'cmpt475'     
     
     #redirect_to demo_angular_path(@find)
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
    @me2 = Sfuproject.find_by id: 3

    
      if @me2.update_attributes(params.require(:inp).permit(:text, :author, :comment))
         @saveit = Sfuproject.new(params.require(:inp).permit(:text, :author, :comment))
         @saveit.save
        @projects = Sfuproject.order(created_at: :desc).limit(5) 
         render "demo/angular", :layout => 'cmpt475' 
        else
      end  
   end

end
