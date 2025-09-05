import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

import { VIDEO_EVENT_TYPES } from "../constants";
import { WEBHOOK_TRIGGERS } from "../webhook/constants";

// Only create Tinybird client if token is available
const tb = process.env.TINYBIRD_TOKEN 
  ? new Tinybird({ token: process.env.TINYBIRD_TOKEN })
  : null;

// Helper function to safely call Tinybird pipes
const safeTinybirdPipe = async (pipe: any, params: any) => {
  if (!tb) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  try {
    return await pipe(params);
  } catch (error) {
    console.error("Tinybird analytics error:", error);
    return { data: [] };
  }
};

export const getTotalAvgPageDuration = tb?.buildPipe({
  pipe: "get_total_average_page_duration__v5",
  parameters: z.object({
    documentId: z.string(),
    excludedLinkIds: z.string().describe("Comma separated linkIds"),
    excludedViewIds: z.string().describe("Comma separated viewIds"),
    since: z.number(),
  }),
  data: z.object({
    versionNumber: z.number().int(),
    pageNumber: z.string(),
    avg_duration: z.number(),
  }),
});

export const getViewPageDuration = tb?.buildPipe({
  pipe: "get_page_duration_per_view__v5",
  parameters: z.object({
    documentId: z.string(),
    viewId: z.string(),
    since: z.number(),
    until: z.number().optional(),
  }),
  data: z.object({
    pageNumber: z.string(),
    sum_duration: z.number(),
  }),
});

export const getTotalDocumentDuration = tb?.buildPipe({
  pipe: "get_total_document_duration__v1",
  parameters: z.object({
    documentId: z.string(),
    excludedLinkIds: z.string().describe("Comma separated linkIds"),
    excludedViewIds: z.string().describe("Comma separated viewIds"),
    since: z.number(),
    until: z.number().optional(),
  }),
  data: z.object({
    sum_duration: z.number(),
  }),
});

export const getTotalLinkDuration = tb?.buildPipe({
  pipe: "get_total_link_duration__v1",
  parameters: z.object({
    linkId: z.string(),
    documentId: z.string(),
    excludedViewIds: z.string().describe("Comma separated viewIds"),
    since: z.number(),
    until: z.number().optional(),
  }),
  data: z.object({
    sum_duration: z.number(),
    view_count: z.number(),
  }),
});

export const getTotalViewerDuration = tb?.buildPipe({
  pipe: "get_total_viewer_duration__v1",
  parameters: z.object({
    viewIds: z.string().describe("Comma separated viewIds"),
    since: z.number(),
    until: z.number().optional(),
  }),
  data: z.object({
    sum_duration: z.number(),
  }),
});

export const getViewUserAgent_v2 = tb?.buildPipe({
  pipe: "get_useragent_per_view__v2",
  parameters: z.object({
    documentId: z.string(),
    viewId: z.string(),
    since: z.number(),
  }),
  data: z.object({
    country: z.string(),
    city: z.string(),
    browser: z.string(),
    os: z.string(),
    device: z.string(),
  }),
});

export const getViewUserAgent = tb?.buildPipe({
  pipe: "get_useragent_per_view__v3",
  parameters: z.object({
    viewId: z.string(),
  }),
  data: z.object({
    country: z.string(),
    city: z.string(),
    browser: z.string(),
    os: z.string(),
    device: z.string(),
  }),
});

export const getTotalDataroomDuration = tb?.buildPipe({
  pipe: "get_total_dataroom_duration__v1",
  parameters: z.object({
    dataroomId: z.string(),
    excludedLinkIds: z.array(z.string()),
    excludedViewIds: z.array(z.string()),
    since: z.number(),
  }),
  data: z.object({
    viewId: z.string(),
    sum_duration: z.number(),
  }),
});

export const getDocumentDurationPerViewer = tb?.buildPipe({
  pipe: "get_document_duration_per_viewer__v1",
  parameters: z.object({
    documentId: z.string(),
    viewIds: z.string().describe("Comma separated viewIds"),
  }),
  data: z.object({
    sum_duration: z.number(),
  }),
});

export const getWebhookEvents = tb?.buildPipe({
  pipe: "get_webhook_events__v1",
  parameters: z.object({
    webhookId: z.string(),
  }),
  data: z.object({
    event_id: z.string(),
    webhook_id: z.string(),
    message_id: z.string(), // QStash message ID
    event: z.enum(WEBHOOK_TRIGGERS),
    url: z.string(),
    http_status: z.number(),
    request_body: z.string(),
    response_body: z.string(),
    timestamp: z.string(),
  }),
});

export const getVideoEventsByDocument = tb?.buildPipe({
  pipe: "get_video_events_by_document__v1",
  parameters: z.object({
    document_id: z.string(),
  }),
  data: z.object({
    timestamp: z.string(),
    view_id: z.string(),
    event_type: z.enum(VIDEO_EVENT_TYPES),
    start_time: z.number(),
    end_time: z.number(),
    playback_rate: z.number(),
    volume: z.number(),
    is_muted: z.number(),
    is_focused: z.number(),
    is_fullscreen: z.number(),
  }),
});

export const getVideoEventsByView = tb?.buildPipe({
  pipe: "get_video_events_by_view__v1",
  parameters: z.object({
    document_id: z.string(),
    view_id: z.string(),
  }),
  data: z.object({
    timestamp: z.string(),
    event_type: z.string(),
    start_time: z.number(),
    end_time: z.number(),
  }),
});

export const getClickEventsByView = tb?.buildPipe({
  pipe: "get_click_events_by_view__v1",
  parameters: z.object({
    document_id: z.string(),
    view_id: z.string(),
  }),
  data: z.object({
    timestamp: z.string(),
    document_id: z.string(),
    dataroom_id: z.string().nullable(),
    view_id: z.string(),
    page_number: z.string(),
    version_number: z.number(),
    href: z.string(),
  }),
});

// Safe wrapper functions for pipes
export const safeGetTotalAvgPageDuration = async (params: any) => {
  if (!getTotalAvgPageDuration) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getTotalAvgPageDuration(params);
};

export const safeGetViewPageDuration = async (params: any) => {
  if (!getViewPageDuration) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getViewPageDuration(params);
};

export const safeGetTotalDocumentDuration = async (params: any) => {
  if (!getTotalDocumentDuration) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getTotalDocumentDuration(params);
};

export const safeGetTotalLinkDuration = async (params: any) => {
  if (!getTotalLinkDuration) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getTotalLinkDuration(params);
};

export const safeGetTotalViewerDuration = async (params: any) => {
  if (!getTotalViewerDuration) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getTotalViewerDuration(params);
};

export const safeGetViewUserAgent_v2 = async (params: any) => {
  if (!getViewUserAgent_v2) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getViewUserAgent_v2(params);
};

export const safeGetViewUserAgent = async (params: any) => {
  if (!getViewUserAgent) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getViewUserAgent(params);
};

export const safeGetTotalDataroomDuration = async (params: any) => {
  if (!getTotalDataroomDuration) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getTotalDataroomDuration(params);
};

export const safeGetDocumentDurationPerViewer = async (params: any) => {
  if (!getDocumentDurationPerViewer) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getDocumentDurationPerViewer(params);
};

export const safeGetWebhookEvents = async (params: any) => {
  if (!getWebhookEvents) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getWebhookEvents(params);
};

export const safeGetVideoEventsByDocument = async (params: any) => {
  if (!getVideoEventsByDocument) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getVideoEventsByDocument(params);
};

export const safeGetVideoEventsByView = async (params: any) => {
  if (!getVideoEventsByView) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getVideoEventsByView(params);
};

export const safeGetClickEventsByView = async (params: any) => {
  if (!getClickEventsByView) {
    console.warn("Tinybird token not configured, skipping analytics");
    return { data: [] };
  }
  return await getClickEventsByView(params);
};
