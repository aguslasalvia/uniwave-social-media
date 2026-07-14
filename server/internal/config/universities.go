package config

import "uniwave/internal/core"

// DefaultUniversities is the canonical catalog of institutions and their
// themes. seedUniversities inserts it on a fresh database, and cmd/seed
// upserts it by name so an existing database picks up palette changes.
//
// Each palette's primary was sampled from the institution's own website
// (July 2026); surfaces, borders and text are tints of that hue tuned for
// the app. Light backgrounds stay white so feeds keep a common canvas.
func DefaultUniversities() []core.University {
	return []core.University{
		{
			// SorvisLater palette (https://fq.aguslasalvia.online): orange
			// #f15b26 (#f47446 in dark), warm peach surfaces / warm greys.
			Name: "Facultad de Química (fq.edu.uy)", State: true,
			Theme: core.Theme{
				Light: core.ThemeMode{
					Background: "#ffffff", Primary: "#f15b26",
					Surface: "#ffffff", SurfaceMuted: "#faf1ec", Border: "#f0e2da",
					Text: "#16181d", TextMuted: "#5f6470",
				},
				Dark: core.ThemeMode{
					Background: "#16181d", Primary: "#f47446",
					Surface: "#1e2129", SurfaceMuted: "#262a33", Border: "#31353f",
					Text: "#f4f5f7", TextMuted: "#8a8a95",
				},
			},
		},
		{
			// fing.edu.uy accent blue #0091ea.
			Name: "Facultad de Ingeniería (fing.edu.uy)", State: true,
			Theme: core.Theme{
				Light: core.ThemeMode{
					Background: "#ffffff", Primary: "#0091ea",
					Surface: "#ffffff", SurfaceMuted: "#eef6fc", Border: "#d9eaf6",
					Text: "#101820", TextMuted: "#5c6b78",
				},
				Dark: core.ThemeMode{
					Background: "#0a1219", Primary: "#52b8f0",
					Surface: "#101b24", SurfaceMuted: "#16242f", Border: "#1f313f",
					Text: "#eef4f9", TextMuted: "#8fa3b3",
				},
			},
		},
		{
			// fder.edu.uy steel blue #4e78bb.
			Name: "Facultad de Derecho (fder.edu.uy)", State: true,
			Theme: core.Theme{
				Light: core.ThemeMode{
					Background: "#ffffff", Primary: "#4e78bb",
					Surface: "#ffffff", SurfaceMuted: "#f0f4fa", Border: "#dde6f2",
					Text: "#131720", TextMuted: "#626b7a",
				},
				Dark: core.ThemeMode{
					Background: "#0e1219", Primary: "#7fa3d9",
					Surface: "#151b26", SurfaceMuted: "#1c2534", Border: "#273246",
					Text: "#eff2f7", TextMuted: "#939eb2",
				},
			},
		},
		{
			// fhce.edu.uy carmine #9a1122.
			Name: "Facultad de Humanidades (fhce.edu.uy)", State: true,
			Theme: core.Theme{
				Light: core.ThemeMode{
					Background: "#ffffff", Primary: "#9a1122",
					Surface: "#ffffff", SurfaceMuted: "#faf0f1", Border: "#f0dadd",
					Text: "#1c1416", TextMuted: "#6e5f62",
				},
				Dark: core.ThemeMode{
					Background: "#171012", Primary: "#d95a6a",
					Surface: "#201719", SurfaceMuted: "#2a1e21", Border: "#38282c",
					Text: "#f6f0f1", TextMuted: "#a39396",
				},
			},
		},
		{
			// ort.edu.uy burgundy #661020 with warm beige neutrals.
			Name: "Universidad ORT Uruguay", State: true,
			Theme: core.Theme{
				Light: core.ThemeMode{
					Background: "#ffffff", Primary: "#661020",
					Surface: "#ffffff", SurfaceMuted: "#edeae2", Border: "#ddd8d4",
					Text: "#201418", TextMuted: "#6f6266",
				},
				Dark: core.ThemeMode{
					Background: "#150d10", Primary: "#b25a70",
					Surface: "#1e1418", SurfaceMuted: "#281b20", Border: "#36262c",
					Text: "#f5eff1", TextMuted: "#a08f95",
				},
			},
		},
		{
			// ucu.edu.uy navy #1c285e; its lighter web blue #4b9ef9 in dark mode.
			Name: "Universidad Católica del Uruguay", State: true,
			Theme: core.Theme{
				Light: core.ThemeMode{
					Background: "#ffffff", Primary: "#1c285e",
					Surface: "#ffffff", SurfaceMuted: "#eff1f7", Border: "#dce0ec",
					Text: "#14192b", TextMuted: "#5f6579",
				},
				Dark: core.ThemeMode{
					Background: "#0c101f", Primary: "#4b9ef9",
					Surface: "#131829", SurfaceMuted: "#1a2136", Border: "#252e4a",
					Text: "#eff1f7", TextMuted: "#9298ad",
				},
			},
		},
	}
}
