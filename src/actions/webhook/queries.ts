import client from "@/lib/prisma"

export const matchKeyword = async (keyword: string) => {
	return await client.keyword.findFirst({
		where: {
			word: {
				equals: keyword,
				mode: 'insensitive'
			}
		}
	})
}

export const getKeywordAutomation = async (automationId: string, dm: boolean) => {
	return await client.automation.findUnique({
		where: {
			id: automationId
		},

		include: {
			dms: dm,
			trigger: {
				where: {
					type: dm ? 'DM' : 'COMMENT',
				},
			},
			listener: true,
			user: {
				select: {
					subscription: {
						select: {
							plan: true
						}
					},
					integrations: {
						select: {
							token: true
						}
					}
				}
			}
		}
	})
}

export const trackResponse = async (
	automationId: string,
	type: 'COMMENT' | 'DM'
) => {
	if (type === 'COMMENT') {
		return await client.listener.update({
			where: { automationId },
			data: {
				commentCount: {
					increment: 1,
				}
			}
		})
	}
	if (type === 'DM') {
		return await client.listener.update({
			where: { automationId },
			data: {
				dmCount: {
					increment: 1
				}
			}
		})
	}
}

export const createChatHistory = (
	automationId: string,
	sender: string,
	reciever: string,
	message: string
) => {
	return client.automation.update({
		where: {
			id: automationId,
		},
		data: {
			dms: {
				create: {
					reciever,
					senderId: sender,
					message,
				},
			},
		},
	})
}

export const getKeywordPost = async (postId: string, automationId: string) => {
	return await client.post.findFirst({
		where: {
			AND: [{ postId: postId }, { automationId }],
		},
		select: { automationId: true }
	})
}

export const getChatHistory = async (sender: string, reciever: string) => {
  const messages = await client.dms.findMany({
    where: {
      OR: [
        { senderId: sender, reciever },
        { senderId: reciever, reciever: sender }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      automationId: true,
      senderId: true,
      message: true
    }
  });

  if (!messages || messages.length === 0) {
    return {
      history: [],
      automatioId: null
    };
  }

  // Explicitly type the role for OpenAI
  const history = messages.map(msg => ({
    role: msg.senderId === sender ? 'user' as const : 'assistant' as const,
    content: msg.message || ''
  }));

  return {
    history,
    automatioId: messages[0].automationId
  };
};