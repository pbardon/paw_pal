require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DogSittingApp
    class Application < Rails::Application
        config.paperclip_defaults = {
            storage: :s3,
            region: ENV['AWS_REGION'],
            s3_region: ENV['AWS_REGION'],
            path: '/:class/:attachment/:id_partition/:style/:filename',
            s3_protocol: 'http',
            url: :s3_domain_url,
            s3_credentials: {
                #these values safely stored in application.yml thanks to figaro!
                region: ENV['AWS_REGION'],
                s3_region: ENV['AWS_REGION'],
                bucket: ENV['AWS_BUCKET_DEVELOPMENT'],
                access_key_id: ENV['AWS_ACCESS_KEY_ID'],
                secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
            }
        }

        config.assets.paths << "#{Rails}/vendor/assets/fonts"
    end
end