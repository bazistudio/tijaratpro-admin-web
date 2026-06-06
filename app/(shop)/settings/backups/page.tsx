"use client";

import React, { useState, useEffect } from "react";
import { 
  Database, 
  Cloud, 
  RefreshCw, 
  Upload, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  FileJson
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axiosInstance from "@/lib/api/axios";
import { useAuthStore } from "@/store";

export default function BackupsPage() {
  const searchParams = useSearchParams();
  const activeShopId = useAuthStore((state) => state.activeShopId);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  const [status, setStatus] = useState({
    isConnected: false,
    email: null as string | null,
    lastBackupAt: null as string | null
  });

  const [restoreConfirmText, setRestoreConfirmText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const fetchStatus = async () => {
    if (!activeShopId) return;
    try {
      const res = await axiosInstance.get("/api/integrations/backup/status");
      if (res.data?.success) {
        setStatus(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch backup status:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [activeShopId]);

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (success === "true") {
      toast.success("Google Drive connected successfully!");
      fetchStatus();
    } else if (error) {
      toast.error(`Connection failed: ${error.replace("_", " ")}`);
    }
  }, [searchParams]);

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    try {
      const res = await axiosInstance.get("/api/integrations/google/connect");
      if (res.data?.authUrl) {
        window.location.href = res.data.authUrl;
      } else {
        toast.error("Failed to initiate Google connection.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to connect to Google.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleManualBackup = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Creating database backup and uploading to Google Drive...");
    try {
      const res = await axiosInstance.post("/api/integrations/backup/manual");
      if (res.data?.success) {
        toast.success("Backup successfully stored in Google Drive!", { id: toastId });
        fetchStatus();
      } else {
        toast.error("Backup failed.", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Backup failed.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.endsWith(".json")) {
        toast.error("Only JSON backup files are supported.");
        return;
      }
      setSelectedFile(file);
      setShowRestoreModal(true);
    }
  };

  const handleRestore = async () => {
    if (restoreConfirmText !== "RESTORE") {
      toast.error("Please type RESTORE to confirm.");
      return;
    }
    if (!selectedFile) return;

    setIsRestoring(true);
    setShowRestoreModal(false);
    const toastId = toast.loading("Streaming and processing database restore... Please wait.");
    
    try {
      const formData = new FormData();
      formData.append("backupFile", selectedFile);

      const res = await axiosInstance.post("/api/integrations/backup/restore", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data?.success) {
        toast.success("Database restored successfully!", { id: toastId });
        setSelectedFile(null);
        setRestoreConfirmText("");
      } else {
        toast.error("Restore failed.", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Restore failed.", { id: toastId });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pb-4 border-b border-[var(--border)]">
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)]">Backup & Data Governance</h1>
        <p className="text-sm font-medium text-[var(--text-soft)] mt-1">
          Automate multi-tenant offsite backups to Google Drive and perform secure database restores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card className="md:col-span-2 border-[var(--border)] bg-[var(--card)] shadow-lg rounded-2xl overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Cloud size={20} className="text-primary animate-pulse" />
                Google Drive Integration
              </CardTitle>
              <Badge variant={status.isConnected ? "default" : "secondary"} className={status.isConnected ? "bg-success/15 text-success hover:bg-success/20 border-none font-bold uppercase tracking-wider text-[10px]" : "font-bold uppercase tracking-wider text-[10px]"}>
                {status.isConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Automatically sync your store's database snapshots every night.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status.isConnected ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-success/5 border border-success/10 flex items-start gap-3">
                  <CheckCircle2 className="text-success shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-main)]">Connected Account</h4>
                    <p className="text-xs text-[var(--text-soft)] mt-0.5">{status.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]/30 border border-[var(--border)]">
                  <div>
                    <p className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Last Sync Attempt</p>
                    <p className="text-sm font-black text-[var(--text-main)] mt-1">
                      {status.lastBackupAt ? new Date(status.lastBackupAt).toLocaleString() : "Never"}
                    </p>
                  </div>
                  <Button 
                    onClick={handleManualBackup} 
                    disabled={isLoading}
                    className="h-10 px-6 rounded-xl font-bold gap-2 text-xs uppercase tracking-wider shadow-lg shadow-primary/15"
                  >
                    <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                    Backup Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[var(--border)] rounded-xl text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Database size={32} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-main)]">No Backup Storage Connected</h4>
                  <p className="text-xs text-[var(--text-soft)] max-w-sm mt-1">
                    Connect your shop to a Google Drive account to activate automated offsite backups.
                  </p>
                </div>
                <Button 
                  onClick={handleConnectGoogle} 
                  disabled={isConnecting}
                  className="h-11 px-8 rounded-xl font-black uppercase tracking-widest text-[10px]"
                >
                  Connect Google Drive <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Column */}
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-[var(--text-soft)] flex items-center gap-1.5">
              <HelpCircle size={16} />
              SaaS Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs font-medium text-[var(--text-soft)]">
            <div className="space-y-1">
              <p className="font-bold text-[var(--text-main)]">Isolated Encryption</p>
              <p>Each tenant gets custom credentials encrypted with military-grade AES-256 keys.</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[var(--text-main)]">Self-Healing Storage</p>
              <p>Old backups are cleaned up automatically. Only the latest 7 snapshots are kept.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Operations */}
      <Card className="border-[var(--border)] bg-[var(--card)] shadow-lg rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Manual Operations</CardTitle>
          <CardDescription className="text-xs">
            Export snapshot or stream restore from a backup file.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border border-[var(--border)] rounded-2xl hover:border-primary/30 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit mb-3">
                <Download size={20} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)]">Export Snapshot</h4>
              <p className="text-xs text-[var(--text-soft)] mt-1">
                Download a raw JSON snapshot of your current database tables immediately.
              </p>
            </div>
            <Button variant="outline" className="h-10 w-fit rounded-xl font-bold gap-2 text-xs uppercase" disabled>
              Generate Export
            </Button>
          </div>

          <div className="p-5 border border-[var(--border)] rounded-2xl hover:border-danger/30 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="p-2.5 rounded-xl bg-danger/10 text-danger w-fit mb-3">
                <Upload size={20} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)] font-heading">Database Restore</h4>
              <p className="text-xs text-[var(--text-soft)] mt-1">
                Dangerously overwrite the current system state by uploading a JSON backup file.
              </p>
            </div>
            <label className="h-10 w-fit rounded-xl font-bold bg-danger/10 text-danger hover:bg-danger/15 transition-all text-xs uppercase flex items-center justify-center px-4 cursor-pointer">
              Upload Backup File
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileChange} 
                className="hidden" 
                disabled={isRestoring}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-[var(--border)] bg-[var(--card)] shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <div className="text-center">
                <CardTitle className="text-lg font-bold text-danger">Confirm Database Restore</CardTitle>
                <CardDescription className="text-xs mt-1">
                  You are about to overwrite all current store data with the snapshot <span className="font-bold text-[var(--text-main)]">"{selectedFile?.name}"</span>.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-danger/5 border border-danger/15 rounded-xl text-xs font-semibold text-danger leading-relaxed">
                WARNING: This process is completely irreversible. Any changes made since the snapshot was created will be permanently lost.
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-main)]">
                  Type <span className="font-mono text-danger">RESTORE</span> below to proceed:
                </label>
                <input 
                  type="text" 
                  value={restoreConfirmText} 
                  onChange={(e) => setRestoreConfirmText(e.target.value)}
                  placeholder="Type RESTORE" 
                  className="w-full h-11 px-3 border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-danger/20"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowRestoreModal(false);
                    setSelectedFile(null);
                    setRestoreConfirmText("");
                  }} 
                  className="flex-1 h-11 rounded-xl font-bold text-xs uppercase"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRestore} 
                  disabled={restoreConfirmText !== "RESTORE"}
                  className="flex-1 h-11 rounded-xl font-bold bg-danger hover:bg-danger-dark text-white text-xs uppercase shadow-lg shadow-danger/25"
                >
                  Proceed Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
