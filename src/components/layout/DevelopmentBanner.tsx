
'use client';

import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function DevelopmentBanner() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-yellow-500/20 border-yellow-500/50">
        <CardContent className="p-3 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <div>
            <p className="text-sm font-semibold text-yellow-300">Under Development</p>
            <p className="text-xs text-yellow-500">This is a work in progress.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
