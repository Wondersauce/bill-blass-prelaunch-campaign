class UserMailer < MandrillMailer::MessageMailer
    default from: "no-reply@billblass.com"

    def signup_email(user)
        @user = user
        @base_url = Rails.application.config.action_mailer.default_url_options
        @ref_url = @base_url + '?ref=' + @user.referral_code
        @share_message = "Hey friends! Sign up for Bill Blass's private launch offer, and get entered to win $3000 of product."
        html = ActionController::Base.new.render_to_string('mandrill/user_mailer/signup_email.html.erb',
          locals: { user: @user, base_url: @base_url, ref_url: @ref_url, share_message: @share_message }, layout: false)
        mandrill_mail(:html => html, :to => user.email, :subject => "Welcome to billblass.com", :from_name => "Bill Blass")
    end
end
