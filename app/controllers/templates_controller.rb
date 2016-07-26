class TemplatesController < ApplicationController
    caches_page :page

    def page
        @path = params[:path]
        @timestamp = params[:timestamp]
        puts "###################################################"
        puts "###################################################"
        puts "###################################################"
        puts "timestamp"
        puts @timestamp
        puts "###################################################"
        puts "###################################################"
        puts "###################################################"

        @timestamp = puts @timestamp
        render :template => 'templates/' + @path, :layout => nil
    end
end
