class UserMailer < ActionMailer::Base
    default from: "Bill Blass <no-reply@billblass.com>"

    def signup_email(user)
        @user = user
        @base_url = Rails.application.config.action_mailer.default_url_options
        @ref_url = @base_url + '?ref=' + @user.referral_code
        @share_message = "Hey friends! Sign up for Bill Blass's private launch offer, and get entered to win $3000 of product."

        mail(:to => user.email, :subject => "Welcome to billblass.com")
    end
end
