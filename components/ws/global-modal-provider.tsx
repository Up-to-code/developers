"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ActionModal } from "@/components/ws/action-modal";

type ModalConfig = {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "danger";
    onConfirm: () => Promise<void> | void;
};

type GlobalModalContextType = {
    openModal: (config: ModalConfig) => void;
    closeModal: () => void;
};

const GlobalModalContext = createContext<GlobalModalContextType | undefined>(undefined);

export function GlobalModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<ModalConfig | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openModal = useCallback((newConfig: ModalConfig) => {
        setConfig(newConfig);
        setIsOpen(true);
        setError(null);
        setIsLoading(false);
    }, []);

    const closeModal = useCallback(() => {
        if (isLoading) return;
        setIsOpen(false);
        setTimeout(() => {
            setConfig(null);
            setError(null);
        }, 300); // Wait for animation
    }, [isLoading]);

    const handleConfirm = async () => {
        if (!config) return;

        setIsLoading(true);
        setError(null);

        try {
            await config.onConfirm();
            closeModal();
        } catch (err) {
            console.error("Modal Action Error:", err);
            setError("حدث خطأ أثناء تنفيذ الإجراء. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlobalModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {config && (
                <ActionModal
                    isOpen={isOpen}
                    title={config.title}
                    description={config.description}
                    confirmLabel={config.confirmLabel}
                    cancelLabel={config.cancelLabel}
                    variant={config.variant}
                    busy={isLoading}
                    error={error}
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                />
            )}
        </GlobalModalContext.Provider>
    );
}

export function useGlobalModal() {
    const context = useContext(GlobalModalContext);
    if (!context) {
        throw new Error("useGlobalModal must be used within a GlobalModalProvider");
    }
    return context;
}
