# 🌍 Geo-Vision-GPT

> **AI-powered geospatial intelligence platform that combines computer vision and large language models to analyze, interpret, and reason over satellite and aerial imagery.**

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)](https://python.org)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4V-412991?logo=openai)](https://openai.com)
[![Streamlit](https://img.shields.io/badge/Frontend-Streamlit-FF4B4B?logo=streamlit)](https://streamlit.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the App](#running-the-app)
- [Usage Guide](#-usage-guide)
- [Supported Use Cases](#-supported-use-cases)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌐 Overview

**Geo-Vision-GPT** bridges the gap between raw geospatial imagery and actionable intelligence by leveraging multi-modal large language models. Users can upload satellite images, aerial photographs, or geospatial rasters, and ask natural language questions — the system will visually interpret the content, extract spatial features, and return structured, human-readable insights.

Whether you're monitoring land cover changes, detecting infrastructure, analyzing disaster zones, or understanding urban expansion — Geo-Vision-GPT makes spatial reasoning accessible to both domain experts and non-technical users alike.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Multi-modal Image Understanding** | Upload satellite/aerial images and ask questions in plain English |
| **GPT-4 Vision Integration** | Uses OpenAI's vision-capable models to reason over geospatial imagery |
| **Spatial Feature Extraction** | Detects land use, terrain features, water bodies, buildings, and roads |
| **Change Detection Prompting** | Compare two time-series images and identify spatial changes |
| **Natural Language GIS** | Query geographic attributes without writing GIS code |
| **Batch Processing** | Process multiple images via API or CLI for pipeline integration |
| **Exportable Insights** | Output results as JSON, CSV, or GeoJSON for downstream use |
| **Streamlit Frontend** | Interactive web interface for drag-and-drop image analysis |

---

## 🏗️ System Architecture

The system follows a layered architecture separating the user interface, orchestration logic, AI backbone, and geospatial tooling:

```
┌─────────────────────────────────────────────────────┐
│                   USER INTERFACE                     │
│           Streamlit Web App / REST API               │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              ORCHESTRATION LAYER                     │
│    Query Parser → Prompt Builder → Response Parser   │
└─────────┬────────────────────────────────┬──────────┘
          │                                │
┌─────────▼──────────┐          ┌──────────▼──────────┐
│   AI BACKBONE      │          │  GEOSPATIAL TOOLS    │
│  GPT-4 Vision API  │          │  Rasterio / GDAL     │
│  LangChain Agent   │          │  GeoPandas / Shapely │
│  Prompt Templates  │          │  OpenStreetMap API   │
└─────────┬──────────┘          └──────────┬──────────┘
          │                                │
┌─────────▼────────────────────────────────▼──────────┐
│                   DATA LAYER                         │
│     Image Storage │ Vector Data │ Result Cache       │
└─────────────────────────────────────────────────────┘
```

> See the [Excalidraw system diagram](#) included in the repository root (`architecture.excalidraw`) for the full interactive version.

---

## 🛠️ Tech Stack

### Core AI & ML
| Library | Version | Role |
|---|---|---|
| `openai` | ≥1.0 | GPT-4 Vision API access |
| `langchain` | ≥0.2 | Prompt orchestration, agent chaining |
| `Pillow` | ≥9.0 | Image preprocessing and manipulation |

### Geospatial Processing
| Library | Version | Role |
|---|---|---|
| `rasterio` | ≥1.3 | Reading/writing geospatial rasters (GeoTIFF) |
| `geopandas` | ≥0.13 | Vector data handling |
| `shapely` | ≥2.0 | Geometry operations |
| `pyproj` | ≥3.5 | CRS transformations |
| `folium` | ≥0.14 | Interactive map rendering |

### Frontend & API
| Library | Version | Role |
|---|---|---|
| `streamlit` | ≥1.30 | Web interface |
| `fastapi` | ≥0.100 | REST API backend |
| `uvicorn` | ≥0.23 | ASGI server |

### Storage & Utilities
| Library | Version | Role |
|---|---|---|
| `boto3` | ≥1.28 | AWS S3 image storage (optional) |
| `redis` | ≥4.0 | Response caching |
| `python-dotenv` | ≥1.0 | Environment management |

---

## 📁 Project Structure

```
Geo-Vision-GPT/
│
├── app/
│   ├── main.py                  # Streamlit entrypoint
│   ├── api.py                   # FastAPI REST endpoint
│   └── pages/
│       ├── analyze.py           # Single image analysis page
│       ├── compare.py           # Change detection page
│       └── batch.py             # Batch processing page
│
├── core/
│   ├── agent.py                 # LangChain agent orchestrator
│   ├── prompt_builder.py        # Domain-specific prompt templates
│   ├── vision_client.py         # OpenAI GPT-4V API wrapper
│   └── response_parser.py       # Structured output extraction
│
├── geo/
│   ├── image_loader.py          # Rasterio-based image loader
│   ├── preprocessor.py          # Tiling, normalization, band selection
│   ├── feature_extractor.py     # Spatial feature detection utilities
│   └── exporter.py              # GeoJSON / CSV export
│
├── data/
│   ├── sample_images/           # Example satellite images
│   └── outputs/                 # Analysis output results
│
├── tests/
│   ├── test_vision_client.py
│   ├── test_geo_preprocessor.py
│   └── test_agent.py
│
├── architecture.excalidraw      # System architecture diagram
├── .env.example                 # Example environment config
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python **3.9+**
- An **OpenAI API key** with access to `gpt-4-vision-preview` or `gpt-4o`
- `GDAL` system dependency (for rasterio)
- `git`

> **Note on GDAL**: GDAL must be installed at the OS level before installing rasterio.
> - **Ubuntu/Debian**: `sudo apt-get install gdal-bin libgdal-dev`
> - **macOS**: `brew install gdal`
> - **Windows**: Use OSGeo4W or Conda

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Shreyashio/Geo-Vision-GPT.git
cd Geo-Vision-GPT
```

**2. Create and activate a virtual environment**

```bash
python -m venv venv
source venv/bin/activate        # Linux/macOS
# OR
venv\Scripts\activate           # Windows
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

---

### Configuration

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Open `.env` and configure:

```env
# Required
OPENAI_API_KEY=sk-...your-openai-api-key...

# Optional — model selection
OPENAI_MODEL=gpt-4o               # Default: gpt-4-vision-preview

# Optional — Redis cache
REDIS_URL=redis://localhost:6379

# Optional — AWS S3 for image storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=geo-vision-gpt-images

# Optional — app config
MAX_IMAGE_SIZE_MB=20
TILE_SIZE=512
APP_PORT=8501
```

---

### Running the App

**Option A — Streamlit UI (recommended for local use)**

```bash
streamlit run app/main.py
```

Then open [http://localhost:8501](http://localhost:8501) in your browser.

**Option B — FastAPI REST API**

```bash
uvicorn app.api:app --reload --port 8000
```

API documentation is auto-generated at [http://localhost:8000/docs](http://localhost:8000/docs).

**Option C — Docker Compose**

```bash
docker-compose up --build
```

This spins up the Streamlit UI, FastAPI backend, and Redis cache together.

---

## 🗺️ Usage Guide

### Via the Web Interface

1. Navigate to the **Analyze** page
2. Upload a satellite image (supported: `.tif`, `.tiff`, `.png`, `.jpg`, `.jp2`)
3. Type your natural language question in the prompt box, e.g.:
   - *"What type of land cover is visible in this image?"*
   - *"Are there any water bodies or flooded areas present?"*
   - *"Count the approximate number of buildings visible."*
4. Click **Analyze** — results appear within seconds
5. Optionally export results as JSON or GeoJSON

### Via the API

```python
import requests

with open("sample.tif", "rb") as f:
    response = requests.post(
        "http://localhost:8000/analyze",
        files={"image": f},
        data={"query": "Describe the land use in this image"}
    )

print(response.json())
```

**Sample Response:**

```json
{
  "status": "success",
  "query": "Describe the land use in this image",
  "analysis": "The image shows a predominantly agricultural area with rectangular field parcels. There is a small settlement cluster in the northeast quadrant. A river meander is visible along the western edge, with riparian vegetation.",
  "detected_features": ["agriculture", "settlement", "river", "vegetation"],
  "confidence": 0.91,
  "model": "gpt-4o",
  "processing_time_ms": 1847
}
```

### Via CLI (Batch Mode)

```bash
python -m geo.batch_analyze \
  --input-dir ./data/sample_images \
  --query "Identify land use type and any infrastructure" \
  --output ./data/outputs/results.jsonl
```

---

## 🌐 Supported Use Cases

### 1. Land Use & Land Cover Classification
Ask the model to identify and describe different land cover types — forests, agriculture, urban areas, water bodies, barren land — directly from imagery without running a dedicated ML classification pipeline.

### 2. Infrastructure Detection
Detect roads, buildings, bridges, airports, and industrial facilities. Useful for urban planning assessments, post-disaster surveys, and construction monitoring.

### 3. Change Detection
Upload a before/after image pair and prompt the model to identify what has changed — deforestation, flood extent, urban sprawl, or infrastructure damage.

### 4. Environmental Monitoring
Analyze vegetation health indicators, identify burned areas, monitor coastline erosion, or assess wetland coverage from multispectral imagery.

### 5. Disaster Response
Rapidly assess satellite imagery after a natural disaster to identify affected areas, damaged infrastructure, and potential rescue zones using natural language queries.

### 6. Agricultural Intelligence
Detect crop types, estimate field parcel boundaries, identify irrigation patterns, and flag anomalies like drought stress or pest damage zones.

---

## 📡 API Reference

### `POST /analyze`

Analyze a single geospatial image.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `image` | `file` | ✅ | Image file (`.tif`, `.png`, `.jpg`) |
| `query` | `string` | ✅ | Natural language question |
| `model` | `string` | ❌ | Override model (default: `gpt-4o`) |
| `export_format` | `string` | ❌ | `json` or `geojson` |

### `POST /compare`

Compare two images for change detection.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `image_before` | `file` | ✅ | Earlier image |
| `image_after` | `file` | ✅ | Later image |
| `query` | `string` | ✅ | e.g., *"What has changed between these two images?"* |

### `GET /health`

Returns API health status and model availability.

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENAI_API_KEY` | ✅ | — | Your OpenAI API key |
| `OPENAI_MODEL` | ❌ | `gpt-4o` | Vision model to use |
| `REDIS_URL` | ❌ | `None` | Redis connection for caching |
| `AWS_ACCESS_KEY_ID` | ❌ | `None` | AWS credential for S3 |
| `AWS_SECRET_ACCESS_KEY` | ❌ | `None` | AWS credential for S3 |
| `S3_BUCKET_NAME` | ❌ | `None` | S3 bucket for image storage |
| `MAX_IMAGE_SIZE_MB` | ❌ | `20` | Max upload size in MB |
| `TILE_SIZE` | ❌ | `512` | Tile size for large image splitting |
| `APP_PORT` | ❌ | `8501` | Streamlit server port |

---

## 🧪 Running Tests

```bash
# Run all tests
pytest tests/ -v

# Run with coverage report
pytest tests/ --cov=core --cov=geo --cov-report=html
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and add tests
4. Ensure all tests pass: `pytest tests/`
5. Commit with a clear message: `git commit -m "feat: add support for GeoTIFF multi-band export"`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Open a Pull Request against `main`

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) format for commit messages.

---

## 🗺️ Roadmap

- [ ] **Multi-band analysis** — Support NIR, SWIR, and thermal band reasoning
- [ ] **SAM integration** — Use Segment Anything Model for pixel-level segmentation before GPT reasoning
- [ ] **Time-series analysis** — Multi-image temporal reasoning over a sequence of dates
- [ ] **GIS tool integration** — Native QGIS plugin for in-app use
- [ ] **Fine-tuned model** — Domain-adapted vision model on geospatial annotation datasets
- [ ] **Geolocation inference** — Estimate image geographic location from visual cues
- [ ] **3D terrain understanding** — Integrate DEM (Digital Elevation Model) data alongside imagery

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [OpenAI GPT-4 Vision](https://platform.openai.com/docs/guides/vision) for multi-modal reasoning
- [LangChain](https://langchain.com) for agent orchestration
- [Rasterio](https://rasterio.readthedocs.io) and [GDAL](https://gdal.org) for geospatial I/O
- [Streamlit](https://streamlit.io) for rapid UI development
- The open geospatial community for datasets and tooling inspiration

---

<p align="center">Built with love for the geospatial AI community 🌍</p>
