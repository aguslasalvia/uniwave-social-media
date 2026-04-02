package interfaces

type HTTPResponse struct {
	Code    int
	Message string
}

func (e *HTTPResponse) Error() string {
	return e.Message
}
