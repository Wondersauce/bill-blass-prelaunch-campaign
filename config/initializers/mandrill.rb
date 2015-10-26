Prelaunchr::Application.configure do
  config.action_mailer.smtp_settings = {
    :address   => "smtp.mandrillapp.com",
    :port      => 587,
    :enable_starttls_auto => true,
    :user_name => "social@billblass.com",
    :password  => "CaXQT8sZxE7I8Jkt1ZJYhw",
    :authentication => 'login',
    :domain => "billblass.com"
  }

  config.action_mailer.delivery_method = :smtp
end

MandrillMailer.configure do |config|
	config.api_key = "CaXQT8sZxE7I8Jkt1ZJYhw"
end
