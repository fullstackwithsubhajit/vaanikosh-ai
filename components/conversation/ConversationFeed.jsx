"use client";

import ConversationItem from "./ConversationItem";

export default function ConversationFeed({ conversation = [] }) {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-8">
      <div className="flex flex-col gap-5">

        {conversation.length === 0 ? (
          <div className="flex justify-center py-12">
            <p className="text-sm text-gray-500">
              Start speaking to begin your conversation with VaaniKosh.
            </p>
          </div>
        ) : (
          conversation.map((item, index) => (
            <ConversationItem
              key={item.id || index}
              item={item}
            />
          ))
        )}

      </div>
    </section>
  );
}