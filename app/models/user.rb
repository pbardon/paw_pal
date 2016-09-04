require 'bcrypt'

class User < ActiveRecord::Base
    attr_reader :password

    validates :email, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 4, allow_nil: true}

    has_many :dogs, class_name: :Dog, foreign_key: :owner_id

    has_one :shelter_account, class_name: 'Shelter', foreign_key: :user_id

    has_many :comments

    before_validation :ensure_session_token

    def self.find_by_credentials(email, password)
        logger.info "find with credentials: #{email}, #{password}"
        user = User.find_by_email(email)
        if user && user.is_password?(password)
            user.password = password
            return user
        else
            false
        end
    end

    def self.find_and_update(session_token, parameters)
        user = User.find_by_session_token(session_token)
            if user.update_attributes(parameters)
            user.save
            true
        else
            false
        end
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def is_password?(password)
        b_crypto = BCrypt::Password.new(self.password_digest)
        b_crypto.is_password?(password)
    end

    def password=(password)
        return false unless password
        @password = password
        self.password_digest = BCrypt::Password.create(password).to_s
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    def ensure_session_token
        @session_token ||= SecureRandom.urlsafe_base64
        puts "returning session token #{@session_token}"
        @session_token
    end

end
