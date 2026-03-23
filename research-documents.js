const researchDocs = [
  {
    "title": "Coordinated Datacenters as Virtual Power Plants: Demand Flexibility for Transmission-Level Congestion Mitigation",
    "abstract": "The unprecedented growth of large-scale datacenters is intensifying stress on electric power transmission networks and exacerbating congestion challenges for grid operators. This paper investigates the deployment of coordinated datacenter flexibility modeled as a Virtual Power Plant (VPP) to mitigate transmissionlevel congestion through demand-side control. Using AC power flow simulations on the IEEE 118-bus test system with engineered congestion, five 200 MW datacenters respond to a centralized congestion-based stress signal by temporarily deferring noncritical computational workloads within operational limits. A comprehensive parameter sweep is conducted across datacenter intervention thresholds, stress signal gain, flexibility bounds, placement methods, and signal allocation to identify optimal operating parameters and design principles. Experimental results indicate that intervention timing exhibits an optimal threshold at which effectiveness is maximized, congestion stress signals saturate at modest levels beyond which additional increases waste deferred energy without improving performance, spatiallyoptimized stress signal allocation schemes significantly outperform uniform signaling, and strategic datacenter placement provides modest improvements in efficiency as compared to random placement. Together, these findings demonstrate that, with proper calibration, coordinated datacenters can act as fast, grid-aware assets for transmission congestion mitigation while clarifying the operational constraints that determine demand-side flexibility effectiveness.",
    "tags": [
      "Datacenters",
      "demand response",
      "load flexibility"
    ],
    "filename": "coordinated-datacenters-as-virtual-power-plants-demand-flexibility-for-transmission-level-congestion.pdf",
    "sourceFilename": "SusTech2026_Luciano_C3_ASPIRE_OAC_CREPES_01_10_26[FINAL].pdf",
    "conference": "IEEE Conference on Technologies for Sustainability (SusTech)",
    "location": "Santa Ana, California, USA",
    "presentationDate": "2026-04-19",
    "presentationDateLabel": "Apr 19, 2026",
    "themeClass": "doc-bg-notes"
  },
  {
    "title": "Context-Aligned Large Language Models for Situational Awareness in Critical Grid Events",
    "abstract": "Power system operators require real-time situational awareness to maintain grid reliability during normal and emergency conditions. During grid emergencies, the operator decisionmaking process is always high-stakes. Insufficient situational awareness, such as incorrect or untimely responses, can be the cause for major blackouts resulting in adverse impacts on millions of customers as well as huge economic losses. Traditional emergency management systems lack the ability to synthesize multi-source regulatory and operational information during timecritical scenarios. This paper presents a Retrieval-Augmented Generation (RAG) system for power system operator decision support leveraging a Large Language Model (LLM) with domainspecific knowledge retrieval to address three operational queries: emergency procedure lookup, compliance interpretation, and event response. This involves hybrid retrieval combining sparse and dense searches over local documents, followed by prompting a local quantized LLM. Two critical features of the proposed RAG-LLM framework are the ability to preserve regulatory metadata and achieve rapid query processing on commodity GPU hardware for supporting operators during grid emergencies. Experimental results indicate that the proposed framework has a higher degree of potential to enhance power system operator situational awareness in critical scenarios.",
    "tags": [
      "GPU",
      "large language model (LLM)",
      "power system emergency operations"
    ],
    "filename": "context-aligned-large-language-models-for-situational-awareness-in-critical-grid-events.pdf",
    "sourceFilename": "GreenTech2026_LucianoPaniagua.pdf",
    "conference": "IEEE Green Technologies Conference (GreenTech)",
    "location": "Boulder, Colorado, USA",
    "presentationDate": "2026-03-25",
    "presentationDateLabel": "Mar 25, 2026",
    "themeClass": "doc-bg-wind"
  },
  {
    "title": "Uncertainty Quantification of Electric Load Demand Forecasts Using Probabilistic Deep Learning Models",
    "abstract": "Accurate and reliable load forecasting is critical for power system planning, operations, and real-time decisionmaking. However, point forecasts fail to capture the uncertainty inherent in load forecasts under variable conditions. To address this limitation, this paper presents a comparative analysis of deterministic and probabilistic Long Short-Term Memory (LSTM) based approaches for quantifying uncertainty in short-term load forecasting. The forecasting models are built upon the LSTM neural network architecture and trained on hourly electric load and temperature data. A baseline deterministic LSTM model is first developed to optimize point forecasting accuracy. Building on this foundation, two probabilistic variants are developed: (i) a parametric LSTM model with Gaussian outputs, trained using the negative log-likelihood (NLL) loss function to directly learn predictive distributions, and (ii) a Monte Carlo (MC) dropout-based LSTM, which estimates uncertainty through repeated stochastic forward passes during inference. The models are rigorously evaluated in terms of both deterministic forecast accuracy and the quality of the generated prediction intervals (PIs), measured by coverage probability and interval sharpness across multiple forecast horizons. Experimental results demonstrate that both probabilistic LSTM models effectively capture uncertainty while maintaining competitive deterministic forecasting performance relative to the deterministic model. These findings underscore the potential of deep probabilistic forecasting to enhance situational awareness and risk-informed decision-making in modern power systems.",
    "tags": [
      "Deep learning model",
      "electric load forecasting",
      "long short-term memory (LSTM)"
    ],
    "filename": "uncertainty-quantification-of-electric-load-demand-forecasts-using-probabilistic-deep-learning-models.pdf",
    "sourceFilename": "Paniagua_NAPS2025_Paper.pdf",
    "conference": "IEEE North American Power Symposium (NAPS)",
    "location": "Hartford, Connecticut, USA",
    "presentationDate": "2025-10-26",
    "presentationDateLabel": "Oct 26, 2025",
    "themeClass": "doc-bg-load"
  }
];
if (typeof window !== "undefined") {
  window.RESEARCH_DOCS = researchDocs;
}
if (typeof module !== "undefined") {
  module.exports = researchDocs;
}
