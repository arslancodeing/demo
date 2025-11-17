'use client';
import { useState } from 'react';
import type { Product } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProductQuestionsProps {
  product: Product;
}

export function ProductQuestions({ product }: ProductQuestionsProps) {
  const { toast } = useToast();
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.length < 10) {
        toast({
            variant: "destructive",
            title: "Question is too short",
            description: "Please enter a question with at least 10 characters.",
        });
        return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setNewQuestion("");
        toast({
            title: "Question Submitted",
            description: "Your question has been submitted and will be answered shortly.",
        });
    }, 1000);
  }

  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
                <CardDescription>Have a question about the {product.name}? Ask the community.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea 
                        placeholder={`e.g. Does this require self-assembly?`}
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Question
                    </Button>
                </form>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Community Q&A</CardTitle>
            </CardHeader>
            <CardContent>
                {product.questions.length > 0 ? (
                <div className="space-y-6">
                    {product.questions.map((qa) => (
                    <div key={qa.id} className="border-t pt-6">
                        <p className="font-semibold">Q: {qa.question}</p>
                        <p className="text-xs text-muted-foreground">by {qa.author} on {new Date(qa.date).toLocaleDateString('en-GB')}</p>
                        <div className="mt-2 pl-4 border-l-2 border-primary">
                            {qa.answer ? (
                                <>
                                    <p className="text-muted-foreground">A: {qa.answer}</p>
                                    <p className="text-xs text-muted-foreground">Answered by Atelier Home</p>
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">A: No answer yet. Check back soon!</p>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="text-muted-foreground">No questions have been asked yet. Be the first!</p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
