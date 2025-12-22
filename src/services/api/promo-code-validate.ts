// services/api/promo-code.ts

import { siteConfig } from "@/config/site";
import { createHeaders } from "@/utils/headers";
import { handleApiError } from "@/utils/api-error";
import {
  ValidatePromoCodeRequest,
  ValidatePromoCodeResponse,
  PromoCodeError,
} from "@/types/promo-code-validate";

export const promoCodeApi = {
  // Validate promo code
  validatePromoCode: async (
    data: ValidatePromoCodeRequest
  ): Promise<ValidatePromoCodeResponse> => {
    const API_BASE_URL = siteConfig.apiBaseUrl;
    const response = await fetch(`${API_BASE_URL}/api/promocode/validate/`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(data),
    });

    // If the response is not ok, check if it's a validation error
    if (!response.ok) {
      const errorData: PromoCodeError = await response.json();
      if (errorData.code) {
        throw new Error(errorData.code[0]);
      }
      await handleApiError(response);
    }

    return response.json();
  },
};
