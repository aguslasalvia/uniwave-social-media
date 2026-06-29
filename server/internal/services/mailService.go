package services

import (
	"bytes"
	"log"
	"os"
	"text/template"

	"gopkg.in/mail.v2"
)

type ActivationData struct {
	Name string
	JWT  string
}

func SendActivationEmail(to string, data ActivationData) error {

	// The template is read at runtime so it can be edited without rebuilding.
	// The path is configurable (handy for Docker) with a sensible default.
	templatePath := os.Getenv("ACTIVATION_TEMPLATE_PATH")
	if templatePath == "" {
		templatePath = "internal/templates/activation.html"
	}

	t, err := template.ParseFiles(templatePath)
	if err != nil {
		return err
	}

	var body bytes.Buffer
	if err := t.Execute(&body, data); err != nil {
		return err
	}

	mailUsername := os.Getenv("MAIL_USERNAME")
	mailAppPassword := os.Getenv("MAIL_APP_PASSWORD")

	m := mail.NewMessage()
	m.SetHeader("From", mailUsername)
	m.SetHeader("To", to)
	m.SetHeader("Subject", "Activa tu cuenta en UniWave")
	m.SetBody("text/html", body.String())

	// 4. Configurar SMTP
	d := mail.NewDialer("smtp.gmail.com", 587, mailUsername, mailAppPassword)
	d.StartTLSPolicy = mail.MandatoryStartTLS
	// 5. Enviar
	if err := d.DialAndSend(m); err != nil {
		return err
	}

	log.Println("Mail sended to: ", to)
	return nil

}
